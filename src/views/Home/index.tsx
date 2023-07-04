import styles from './index.module.css';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
    return (
        <div className={styles.home}>
            This is home
        </div>
    );
}

Component.displayName = 'Home';
