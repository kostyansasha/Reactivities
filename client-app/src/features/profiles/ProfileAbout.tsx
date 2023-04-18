import { Button, Grid, Header, Label, Segment, Tab } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import ProfileEdit from "./ProfileEdit";
import { Profile } from "../../app/models/profile";

interface Props {
    profile: Profile
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser } } = useStore();
    const [editMode, setEditMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='align left' content='About' />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={editMode ? 'Cancel' : 'Edit'}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>

                <Grid.Column width={16}>
                    {editMode && profile ? (
                        <ProfileEdit setEditMode={setEditMode} />
                    ) : (
                        <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
})