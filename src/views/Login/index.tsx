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
        <div className={styles.login}>
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
            <div className={styles.loginForm}>
                <Header
                    heading="Login"
                    description="Ready to create some questions? Get Started!"
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
                    Login
                </Button>
            </div>
        </div>
    );
}

Component.displayName = 'Login';
