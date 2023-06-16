import { useRef, useCallback } from 'react';
import {
    TextInput,
    PasswordInput,
    Header,
    Button,
    useAlert,
} from '@the-deep/deep-ui';
import {
    ObjectSchema,
    emailCondition,
    getErrorObject,
    requiredStringCondition,
    useForm,
    PartialForm,
} from '@togglecorp/toggle-form';
import { useMutation, gql } from '@apollo/client';
import Captcha from '@hcaptcha/react-hcaptcha';

import HCaptcha from '#components/HCaptcha';
import NonFieldError from '#components/NonFieldError';
import { hCaptchaKey } from '#configs/hCaptcha';
import {
    RegisterMutation,
    RegisterMutationVariables,
    RegisterInput,
} from '#generated/types';

import styles from './index.module.css';

// FIXME: import is weird will full names

const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        public {
            register(data: $input) {
                ok
                errors
                result {
                    email
                    firstName
                    id
                    lastName
                    emailOptOuts
                }
            }
        }
    }
`;

type FormType = PartialForm<RegisterInput>;
type FormSchema = ObjectSchema<FormType>;
type FormSchemaFields = ReturnType<FormSchema['fields']>;

const schema: FormSchema = {
    fields: (): FormSchemaFields => ({
        email: {
            required: true,
            validations: [
                emailCondition,
            ],
            requiredCondition: requiredStringCondition,
        },
        firstName: {
            required: false,
        },
        lastName: {
            required: false,
        },
        captcha: {
            required: true,
            requiredCondition: requiredStringCondition,
        },
    }),
};

const initialValue: FormType = {};

// eslint-disable-next-line import/prefer-default-export
export function Component() {
    const elementRef = useRef<Captcha>(null);

    const alert = useAlert();
    const {
        pristine,
        validate,
        value: formValue,
        error: formError,
        setFieldValue,
        setError,
    } = useForm(schema, { value: initialValue });

    const fieldError = getErrorObject(formError);

    const [
        triggerRegister,
        { loading: registerPending },
    ] = useMutation<RegisterMutation, RegisterMutationVariables>(
        REGISTER,
        {
            onCompleted: (registerResponse) => {
                const response = registerResponse?.public?.register;
                if (!response) {
                    return;
                }

                if (response.ok) {
                    alert.show(
                        'Successfully registered!',
                        { variant: 'success' },
                    );
                } else {
                    alert.show(
                        'Failed to register user!',
                        { variant: 'error' },
                    );
                }
            },
            onError: () => {
                alert.show(
                    'Failed to register user!',
                    { variant: 'error' },
                );
            },
        },
    );

    const handleSubmit = useCallback(() => {
        elementRef.current?.resetCaptcha();
        const result = validate();

        if (result.errored) {
            setError(result.error);
            return;
        }
        const body = result.value;
        triggerRegister({
            variables: {
                input: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    // TODO: Fix this type error
                    email: body.email ?? '',
                    captcha: body.captcha ?? '',
                },
            },
        });
    }, [
        triggerRegister,
        validate,
        setError,
    ]);

    return (
        <div className={styles.register}>
            <div className={styles.logoContainer}>
                <img
                    src="/logo.png"
                    className={styles.logo}
                    alt="Questionnaire Builder Logo"
                />
                <div className={styles.tagline}>
                    Lorem ipsum dolor sit amet consectetur.
                    jahsdhjakasdbkjabd jkhdakjhasdkjbnajksd
                    b
                </div>
            </div>
            <div className={styles.fields}>
                <NonFieldError error={formError} />
                <Header
                    heading="Register"
                    description="First step to creating amazing questionnaires."
                    headingSize="small"
                />
                <TextInput
                    name="firstName"
                    value={formValue?.firstName}
                    error={fieldError?.firstName}
                    onChange={setFieldValue}
                    placeholder="First name"
                />
                <TextInput
                    name="lastName"
                    value={formValue?.lastName}
                    error={fieldError?.lastName}
                    onChange={setFieldValue}
                    placeholder="Last name"
                />
                <TextInput
                    name="email"
                    value={formValue?.email}
                    error={fieldError?.email}
                    onChange={setFieldValue}
                    placeholder="Email"
                />
                <PasswordInput
                    name="password"
                    type="password"
                    value=""
                    placeholder="Password"
                />
                <HCaptcha
                    name="captcha"
                    elementRef={elementRef}
                    siteKey={hCaptchaKey}
                    onChange={setFieldValue}
                    error={fieldError?.captcha}
                    disabled={registerPending}
                />
                <Button
                    name={undefined}
                    variant="transparent"
                    spacing="none"
                >
                    forgot password?
                </Button>
                <Button
                    name={undefined}
                    className={styles.button}
                    onClick={handleSubmit}
                    disabled={pristine || registerPending}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}

Component.displayName = 'Register';
