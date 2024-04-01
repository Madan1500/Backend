const asynchandler=(requestHandler)=>{  //requestHandler is a function that takes req,res,next as arguments and returns a promise
    (req,res,next)=>{
        Promise
            .resolve(requestHandler)
            .catch((err)=>next(err));
    }
};


export { asynchandler };

// const asynchandler=()=>{};
// const asynchandler=(func)=>{()=>{}};
// const asynchandler=(func)=>async()=>{};



//try-catch syntax

// const asynchandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code||500).json({success:false, message:error.message||"Something went wrong"})
//     }
//  };