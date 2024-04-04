import { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Grid, Typography, MenuItem, Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { differenceInYears } from "date-fns";
import InsuranceService from '../services/InsuranceService';
import LookUpService from '../services/LookUpService';
import { ToasterType } from "../utils/ToasterType";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import Toast from "../utils/toasterUtil";

export const CalculatePremium = () => {

    const initialCustomerState = {
        name: "",
        age: "",
        occupation: "",
        sumAssured: 0
    }

    const [selectedDate, setSelectedDate] = useState(null);
    const [customer, setCustomer] = useState(initialCustomerState);
    const [customerError, setCustomerError] = useState([]);
    const [occupations, setOccupations] = useState([]);

    const onValuesChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (customer.occupation) {
            onCalculatePremium();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer.occupation]);

    const customerRequiredFields = {
        name: "name",
        age: "age",
        occupation: "occupation",
        sumAssured: "sumAssured"
    };

    const onCalculatePremium = () => {
        let errorArray = [];
        const selectedRowValuesArray = customer;
        Object.keys(customerRequiredFields).forEach((field) => {
            if (selectedRowValuesArray[field] === "" || selectedRowValuesArray[field] === 0) {
                errorArray.push(customerRequiredFields[field]);
            }
        });
        setCustomerError(errorArray);
        if (errorArray.length > 0) {
            Toast("Enter all mandatory fields", ToasterType.ERROR);
        } else {
            CalculatePremium(customer);
        }
    }

    const CalculatePremium = (customer) => {
        InsuranceService.CalculatePremium(JSON.stringify(customer))
            .then((response) => {

                if (response.data.statusCode === HttpStatusCode.OK) {
                    Toast(`Your Premium amount is ${response.data.object}`, ToasterType.SUCCESS);
                }
                else {
                    Toast(response.data.Message, ToasterType.ERROR);
                }
            })
            .catch((error) => {
                Toast(error, ToasterType.ERROR);
            });
    };

    const onResetControls = () => {
        setCustomer(initialCustomerState);
        setSelectedDate(null);
        setCustomerError([]);
    }

    useEffect(() => {
        const ocuupationsLocalStorage = localStorage.getItem("Occupations");
        if (ocuupationsLocalStorage === null) {
            LookUpService.GetOccupations()
                .then((response) => {
                    localStorage.setItem("Occupations", JSON.stringify(response.data.object));
                    setOccupations(response.data.object);
                })
                .catch((error) => {
                    Toast(error, ToasterType.ERROR);
                });
        } else {
            const occupationsLocalStorageArray = JSON.parse(ocuupationsLocalStorage);
            setOccupations(occupationsLocalStorageArray);
        }
    }, []);

    useEffect(() => {
        if (selectedDate != null) {
            setCustomer({ ...customer, "age": differenceInYears(new Date(), new Date(selectedDate)) })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    return (
        <>
            <Container fixed className='CalcContainer'>
                <Box sx={{ flexGrow: 1, p: '2rem' }}>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                            <Typography required>Name<span className='requiredAsterisk'>*</span></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name='name' error={customerError.includes("name")} fullWidth placeholder='Name' value={customer.name} onChange={(e) => { onValuesChange(e) }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                            <Typography>Age<span className='requiredAsterisk'>*</span></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name='age' error={customerError.includes("age")} disabled fullWidth required placeholder='Age' value={customer.age} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                            <Typography>Date Of Birth<span className='requiredAsterisk'>*</span></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="customDatePickerWidth">
                                    <DatePicker name='dob' setError={customerError.includes("age")} value={selectedDate} onChange={newValue => { setSelectedDate(newValue) }}
                                        slotProps={{ textField: { variant: 'outlined', error: customerError.includes("age") } }}
                                    />
                                </div>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                            <Typography>Sum Assured<span className='requiredAsterisk'>*</span></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField type='number' error={customerError.includes("sumAssured")} name='sumAssured' fullWidth required placeholder='Sum Assured' value={customer.sumAssured === 0 ? '' : customer.sumAssured} onChange={(e) => { onValuesChange(e) }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                            <Typography>Occupation<span className='requiredAsterisk'>*</span></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Select fullWidth
                                value={customer.occupation}
                                label="Occupation"
                                name='occupation'
                                onChange={(e) => { onValuesChange(e) }}
                                placeholder='Occupation'
                                className={`${customerError.includes("occupation") ? "Mui-error" : ""}`}
                            >
                            {occupations.map((occupation)=>
                                <MenuItem selected key={occupation.id} value={occupation.id}>{occupation.occupationName}</MenuItem>
                            )}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: '1rem', alignItems: 'center', display: 'flex' }}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={4}>
                            <Button sx={{ mr: '1rem' }} variant="contained" onClick={() => { onCalculatePremium() }}>Submit</Button>
                            <Button variant="contained" onClick={() => { onResetControls() }}>Clear</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}