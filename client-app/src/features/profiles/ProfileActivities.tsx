import { Card, Image, Tab } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { format } from "date-fns";


interface Props {
    predicate: string;
}

export default observer(function ProfileActivities({ predicate }: Props) {
    const { profileStore: { loadUserActivities, userActivities, loadingUserActivities } } = useStore();

    useEffect(() => {
        loadUserActivities(predicate);
    }, [loadUserActivities, predicate]);

    //In Solution
    //{ menuItem: 'Future Events', pane: { key: 'future' } },
    //const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    //    loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key);
    //};

    return (
        <Tab.Pane loading={loadingUserActivities}>
            <Card.Group itemsPerRow={4}>
                {userActivities && userActivities.map((activity) => (
                    <Card key={activity.id} as={Link} to={`/activity/${activity.id}`}>
                        <Image
                            src={`/assets/categoryImages/${activity.category}.jpg`}
                            style={{ minHeight: 100, objectFit: 'cover' }}
                        />
                        <Card.Content>
                            <Card.Header textAlign='center'>{activity.title}</Card.Header>
                            <Card.Meta textAlign='center'>
                                <div>{format(new Date(activity.date), 'do LLL')}</div>
                                <div>{format(new Date(activity.date), 'h:mm a')}</div>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    );
})