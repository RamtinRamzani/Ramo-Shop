import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import data from "../../../data/coment.json";
import CommentForm from "./CommentForm";
import CommentSelected from "./CommentSelected";
import PersonComment from "./PersonComment";

export default function Comment() {
  const comment = data.comments;

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Tabs
        className="flex flex-col"
        aria-label="Tabs variants"
        variant="underlined"
        color="default"
        fullWidth
      >
        {comment.map((item) => (
          <Tab className="~text-xs/base" key={item.id} title={item.label}>
            <Card>
              <CardBody className="~px-5/10 pb-10 mt-10">
                <h2 className="mb-6 text-2xl font-semibold text-neutral-05 dark:text-grey-200">
                  {item.title}
                </h2>
                <CommentForm button={item.button} />
                <CommentSelected
                  reviews={item.reviews || []}
                  selected={item.selected || []}
                />
                <PersonComment reviews={item.reviews || []} />
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
