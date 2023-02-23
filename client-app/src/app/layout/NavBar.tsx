import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/asserts/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name='Activities'></Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}