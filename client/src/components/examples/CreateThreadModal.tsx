import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateThreadModal from '../CreateThreadModal';

export default function CreateThreadModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <CreateThreadModal
        open={open}
        onOpenChange={setOpen}
        onCreateThread={(data) => {
          console.log('Thread created:', data);
        }}
      />
    </div>
  );
}
