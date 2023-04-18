import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import * as Yup from 'yup';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEdit({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore();

    return (
        <Formik
            initialValues={{ displayName: profile?.displayName, bio: profile?.bio, error: null }}
            onSubmit={(values, { setErrors }) =>
                updateProfile(values)
                    .then(() => { setEditMode(false); })
                    .catch(error => { setErrors({ error: error }) }
                )}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Updating your profile' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder="Write your Display Name" />
                    <MyTextArea name='bio' placeholder="Add your bio" rows={5} />
                    <ErrorMessage
                        name='error'
                        render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />
                        }
                    />
                    <Button floated="right" loading={isSubmitting} positive content='Update' type="submit" />
                </Form>
            )}
        </Formik>
    );
})