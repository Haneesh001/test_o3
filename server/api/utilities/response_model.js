//@Functionality: Common API Response model
class ResponseModel {
    //Need to take params from API's, as Input
    /*Need to add Data in param & key in future*/
   
    static show(statusCode, success, message, error) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.error = error;
        return {
            statusCode: this.statusCode,
            success: this.success,
            //data: this.data,
            message: this.message,
            error: this.error
        };
    }
}

module.exports = ResponseModel;