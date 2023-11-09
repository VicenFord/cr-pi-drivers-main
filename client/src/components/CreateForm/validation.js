export const validation = (driverInfo) => {
    const { name, lastname, nationality, image, birthDate, description, teams } = driverInfo;

    const RegexStrings = /^[a-zA-Zá-úÁ-Ú]+(?:\s+[a-zA-Zá-úÁ-Ú]+)*$/;
    const RegexSinCorchetesNiLlaves = /^[^[\]{}]*$/;


    let errors = {};
    
    
    if(!name){
        errors.name = "Required";
    } else if (!RegexStrings.test(name)) {
        errors.name = "Name must contain only letters and spaces";
    }


    if(!lastname){
        errors.lastname = "Required";
    } else if (!RegexStrings.test(lastname)) {
        errors.lastname = "Lastname must contain only letters and spaces";
    }

    if(!nationality){
        errors.nationality = "Required";
    } else if (!RegexStrings.test(nationality)) {
        errors.nationality = "Nationality must contain only letters and spaces";
    }

    if(!birthDate){
        errors.birthDate = "Required";
    }

    if(!description){
        errors.description = "Required";
    }

    if(teams){
        if(!RegexSinCorchetesNiLlaves.test(teams)) {
            errors.teams = "Can't contain [ ] or { }";
        }
    }


    return errors;
}