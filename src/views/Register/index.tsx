import {
    TextInput,
    PasswordInput,
    Header,
    Button,
} from '@the-deep/deep-ui';

import styles from './index.module.css';

// FIXME: import is weird will full names

// eslint-disable-next-line import/prefer-default-export
export function Component() {
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
            <div className={styles.registerForm}>
                <Header
                    heading="Register"
                    description="First step to creating amazing questionnaires."
                    headingSize="small"
                />
                <TextInput
                    name="email"
                    type="email"
                    value=""
                    placeholder="Email"
                />
                <PasswordInput
                    name="password"
                    type="password"
                    value=""
                    placeholder="Password"
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
                    onClick={() => console.log('clicked')}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}

Component.displayName = 'Register';
