class apiError extends Error{
  constructor(statusCode,message="something went wrong",errors=[],stack){
      super(message); // super is used to call the constructor of the parent class
      this.statusCode=statusCode
      this.error=errors
      this.stack=stack
    //   if(stack){
    //     this.stack=stack
    //   } else {
    //     Error.captureStackTrace(this,this.constructor)
    //   }
  }
}

