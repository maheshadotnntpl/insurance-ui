import { toast } from "react-toastify";
import { ToasterType } from "./ToasterType";

const Toast = (message, toasterType) => {  
  switch (toasterType) {
    case ToasterType.SUCCESS:
      return toast.success(
        message,{ 
          toastId: "custom-id-yes", 
          position: "top-center",           
          autoClose: false, 
          closeButton: true, 
          hideProgressBar: true, 
          theme: "colored" 
        }
    );
    case ToasterType.ERROR:
      return toast.error(
        message,{ 
            toastId: "custom-id-yes", 
            position: "top-center", 
            autoClose: 1800, 
            closeButton: false, 
            hideProgressBar: true, 
            theme: "colored" 
          }
      );
    case ToasterType.WARNING:
      return toast.warning(
        message,{ 
          toastId: "custom-id-yes", 
          position: "top-center", 
          autoClose: 1800, 
          closeButton: false, 
          hideProgressBar: true, 
          theme: "colored" 
        }
      );
    default:
      return toast.warning(
        message,{ 
          toastId: "custom-id-yes", 
          position: "top-center", 
          autoClose: 1800, 
          closeButton: false, 
          hideProgressBar: true, 
          theme: "colored" 
        }
      );
  }
};
export default Toast;