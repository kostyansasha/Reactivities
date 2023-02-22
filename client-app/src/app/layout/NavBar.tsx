import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../store/store";

export default function NavBar() {
    const { activityStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/asserts/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'></Menu.Item>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}