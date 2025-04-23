import { Textarea } from "@heroui/react";
import Button from "../../ui/Button";
import { useState } from "react";

export default function CommentForm({ button }: { button: string }) {
  const [textArea, setTextArea] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted text:", textArea);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 rounded-xl"
    >
      <Textarea
        className="max-w-full"
        size="sm"
        minRows={2}
        height="100px"
        radius="full"
        variant="faded"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <Button
        type="submit"
        className="hidden h-10 font-normal rounded-full sm:block"
      >
        {button}
      </Button>
    </form>
  );
}
