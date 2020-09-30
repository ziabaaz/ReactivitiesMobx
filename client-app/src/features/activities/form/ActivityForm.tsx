import React, { useState ,FormEvent} from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity : (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting:boolean
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({...activity, [name]: value });
  };

  const handleSubmit = () =>{
    if (activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid()
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
          name="title"
        ></Form.Input>
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        ></Form.Input>
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        ></Form.Input>
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        ></Form.Input>
        <Button loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button 
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
