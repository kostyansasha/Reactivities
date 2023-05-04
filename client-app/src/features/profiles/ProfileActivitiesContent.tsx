import { Grid, Header, Tab } from "semantic-ui-react";
import ProfileActivities from "./ProfileActivities";
import { observer } from "mobx-react-lite";

export default observer(function ProfileActivitiesContent() {
    const panes = [
        { menuItem: 'Future Events', render: () => <ProfileActivities predicate='future' /> },
        { menuItem: 'Past Events', render: () => <ProfileActivities predicate='past' /> },
        { menuItem: 'Hosting', render: () => <ProfileActivities predicate='hosting' /> }
    ];

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='align left' content='Activities' />
                </Grid.Column>

                <Grid.Column width={16}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes}
                    />
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
})