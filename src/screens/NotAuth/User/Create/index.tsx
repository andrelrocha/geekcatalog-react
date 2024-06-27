import React from "react";
import { Control, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../../utils/colors";
import { loremIpsum } from "../../../../utils/lorem";
import { useAuth } from "../../../../context/hooks";
import { FileUploadButton, Heading, InputEmail, InputPassword, 
  InputText, InputPasswordValidation, InputCPF, InputDate,
  TextWarning, DropdownSelection, InputPhone,
  ButtonLoading,
  ButtonNavigation
} from "../../../../components";
import useUserCreation from "../../../../context/hooks/user/useUserCreation";
import useCountriesDropdown from "../../../../context/hooks/countries/useCountriesDropdown";
import { UserCreate } from "../../../../types/user/userCreateDTO";
import { isSamePassword } from "../../../../libs/validators/password";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM_VALUES = {
  name: "",
  birthday: "",
  cpf: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  term: "",
  country: "",
};

type FormData = {
  name: string,
  birthday: string,
  cpf: string,
  phone: string,
  email: string,
  password: string,
  country: string,
  uri: string,
}

const Create = () => {
    const navigation = useNavigate(); 
    const {
        control,
        formState: { isValid },
        handleSubmit,
        reset,
        resetField
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"})
    //const { isLoading, signUp } = useAuth()
    const { isLoading } = useAuth();

    const { uri,
        isPasswordClicked, setIsPasswordClicked, 
        showTerms, setShowTerms,
        isAccepted, setIsAccepted,
        handleProfilePicture, 
    } = useUserCreation();

    const { dropdownData } = useCountriesDropdown();
    
    const handleSignUp = async (control: Control<FormData>) => {
        //if (isAccepted === '') return alert('You must accept the Terms and Conditions of Use');
        
        const isEqualPassword = isSamePassword(control._formValues.password, control._formValues.passwordConfirm);
        if (!isEqualPassword) return alert('The passwords do not match');

        const name = control._formValues.name;
        const cpf = control._formValues.cpf;
        const email = control._formValues.email;
        const password = control._formValues.password;
        const country = control._formValues.country;
        const birthday = control._formValues.birthday;
        const phone = control._formValues.phone;

        const userData: UserCreate = {
            name,
            birthday,
            cpf,
            phone,
            login: email,
            password,
            countryId: country,
            uri: uri,
        };

        console.log(userData);

        //await signUp(userData, () => navigation('/homeauth'));    
        reset();
        resetField('country');
    }

    return (
            <>
            <Box>
                <Heading mb={1} mt={4}>
                Welcome to Geek Catalog!
                </Heading>

                <Typography sx={styles.subtitle}>
                    Fill in the fields below to create your account
                </Typography>

                <Box sx={styles.formContainer}>
                    <InputText control={control} name="name" placeholder="Full Name" label="Name" rules={{ required: true }} />

                    <InputDate control={control} name="birthday" placeholder="Birth Date" label="Birthday" rules={{ required: true }}/>

                    <InputCPF control={control} name="cpf" placeholder="CPF" label="CPF" rules={{ required: true }} />

                    <DropdownSelection
                        control={control}
                        name="country"
                        placeholder="Country"
                        label="name"
                        value="id"
                        options={dropdownData}
                        labelDisplay="Country"
                    />

                    <InputPhone control={control} name="phone" placeholder="Mobile Phone" label="Phone" rules={{ required: true }}/>

                    <InputEmail control={control} name="email" placeholder="E-mail" label="E-mail" rules={{ required: true }}/>

                    {isPasswordClicked && (
                            <TextWarning style={styles.passwordWarning}>Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.</TextWarning>
                    )}
                    <InputPasswordValidation 
                        label="Password"
                        control={control} 
                        name="password" 
                        placeholder="Password" 
                        rules={{ required: true}} 
                        inputProps={{
                            onFocus: () => setIsPasswordClicked(true),
                            onBlur: () => setIsPasswordClicked(false),
                        }}
                    />

                    <InputPassword 
                        label="Confirm Password"
                        control={control} 
                        name="passwordConfirm" 
                        placeholder="Confirm Password"
                        rules={{ required: true }}
                        inputProps={{
                            onFocus: () => setIsPasswordClicked(false),
                        }}
                    />

                        {/*
                        <InputCheckbox
                        aria-label="I accept the Terms and Conditions of Use"
                        control={control}
                        label={
                            <>
                            <Text>I accept the </Text>
                            <Text
                                onPress={() => setShowTerms(true)}
                                style={{ color: colors.buttonBlue}}
                            >Terms and Conditions of Use
                            </Text>
                            </>
                        }
                        name="term"
                        onPress={() => setIsAccepted(!isAccepted ? 'accepted' : '')}
                        value={isAccepted ? "accepted" : ""}
                        isChecked={isAccepted === '' ? false : true}
                        />
                        */}
                        {!uri ? (
                            <FileUploadButton title="Add Profile Picture" fileExtension=".jpeg" onChange={handleProfilePicture}/>
                        ) : (
                            <img src={uri} alt="Profile" style={styles.profilePic}/>
                        )}


                        <Box sx={styles.buttonsContainer}>
                            <ButtonLoading
                                mt={1}
                                disabled={!isValid}
                                isLoading={isLoading}
                                backgroundColor={colors.greenStrong}
                                onClick={handleSubmit(async () =>
                                    handleSignUp(control as unknown as Control<FormData>)
                                    )}
                                >Sign up
                            </ButtonLoading>

                            <ButtonNavigation
                                to="/login"
                                backgroundColor={colors.buttonBlue}
                                mt={1}
                                >Already have an account?
                            </ButtonNavigation>
                        </Box>
                </Box>
            </Box>

            {/*

            <Modal
                body={loremIpsum}
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
                title="Terms and Conditions of Use"
            />
            */}
            </> 
        );
        }

const styles = {
        formContainer: {
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
        },
        subtitle: {
            fontSize: 18,
            textAlign: 'center',
            margin: 'auto',
            marginBottom: 4,
            color: colors.black,
            width: '80%'
        },
        passwordWarning: {
            width: '90%',
            margin: 'auto',
            height: 3,
            padding: 5,
            borderRadius: 4,
            backgroundColor: colors.redWeakDarker,
            '@media (max-width: 425px)': {
                width: 'auto',
                height: 'auto',
                padding: 1
            }
        },
        buttonsContainer: {
            width: '40%',
            margin: 'auto',
            paddingBottom: 6
        },
        profilePic: {
            width: 200, 
            height: 200, 
            borderRadius: 10, 
            objectFit: 'cover' as 'cover',
        }
};

export default Create;