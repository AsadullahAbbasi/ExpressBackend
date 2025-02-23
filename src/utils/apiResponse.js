class apiResponse {
    constructor(statusCode, message, data, ) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.sucess = statusCode >= 200 && statusCode < 300
    }
}
export default apiResponse