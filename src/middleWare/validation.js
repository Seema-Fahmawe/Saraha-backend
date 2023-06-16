
const methods=['body','query','params'];
const validation = (schema) => {
    return (req, res, next) => {
        const validationArray = [];
        methods.forEach((method)=>{
            if (schema[method]) {
                const validationResultBody = schema[method].validate(req[method], { abortEarly: false });
                if (validationResultBody.error) {
                    validationArray.push(validationResultBody.error.details);
                }
            }
        })
      
        if(validationArray.length > 0){
            return res.json({message:'validation error',validationArray});
        }else{
            next();
        }

    }
}


export default validation;