export const HttpStatusCode =
{
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
     OK : 200,

     /**
      * The request has been fulfilled, resulting in the creation of a new resource.
      */
     CREATED : 201,
 
     /**
      * The request has been accepted for processing, but the processing has not been completed.
      * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
      */
     ACCEPTED : 202,

     /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    BAD_REQUEST : 400,

    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    UNAUTHORIZED : 401,

    /**
     * Indicates that the request could not be processed because of conflict in the request,
     * such as an edit conflict between multiple simultaneous updates.
     */
     CONFLICT : 409,

     /**
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
     */
    INTERNAL_SERVER_ERROR : 500

}