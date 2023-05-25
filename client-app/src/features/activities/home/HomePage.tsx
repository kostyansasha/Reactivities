import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { observer } from 'mobx-react-lite';
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import { useEffect } from "react";
import FacebookLogin, { FacebookLoginClient } from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    const appId = "782274383401233";
      
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>

                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>

                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => { modalStore.openModal(<LoginForm />) }} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => { modalStore.openModal(<RegisterForm />) }} size='huge' inverted>
                            Register!
                        </Button>

                        <Divider horisontal inverted>Or</Divider>

                        <Button 
                            as={FacebookLogin} 
                            appId={appId}

                            size='huge'
                            inverted
                            color='facebook'
                            loading={userStore.fbLoading}
                            content='Facebook login'

                            onSuccess={(response: any) => {
                                console.log('Login Success!', response);
                                //userStore.facebookLogin(response.access);
                            }}
                            onFail={(error: any) => {
                                console.log('Login Failed!', error);
                            }}
                            onProfileSuccess={(response: any) => {
                                console.log('Get Profile Success!', response);
                            }}
                        />
                    </>
                )}
            </Container>
        </Segment>
    )
})
