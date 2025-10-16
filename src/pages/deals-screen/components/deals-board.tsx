"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Deal = {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: "Lead" | "Qualified" | "Proposal" | "Won" | "Lost";
};

const initialDeals: Deal[] = [
  {
    id: "1",
    title: "Website Redesign",
    company: "Innovate Inc.",
    value: 10000,
    stage: "Lead",
  },
  {
    id: "2",
    title: "Mobile App Development",
    company: "Synergy Corp.",
    value: 25000,
    stage: "Qualified",
  },
  {
    id: "3",
    title: "Cloud Migration",
    company: "Quantum Solutions",
    value: 50000,
    stage: "Proposal",
  },
  {
    id: "4",
    title: "New Marketing Campaign",
    company: "Apex Industries",
    value: 5000,
    stage: "Won",
  },
  {
    id: "5",
    title: "E-commerce Platform",
    company: "Starlight Enterprises",
    value: 30000,
    stage: "Lost",
  },
];

const stages = ["Lead", "Qualified", "Proposal", "Won", "Lost"];

function SortableItem({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-2">
        <CardContent className="p-4">
          <p className="font-bold">{deal.title}</p>
          <p className="text-sm text-muted-foreground">{deal.company}</p>
          <p className="text-sm font-bold mt-2">
            ${deal.value.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DealColumn({ stage, deals }: { stage: string; deals: Deal[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{stage}</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <SortableItem key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
}

export function DealsBoard() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = deals.findIndex((d) => d.id === active.id);
      const newIndex = deals.findIndex((d) => d.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newDeals = arrayMove(deals, oldIndex, newIndex);

        // This is a simplified logic. A real implementation would need to know which column the item was dropped into.
        // For this example, we'll just reorder the list, but the stage of the deal won't change.
        // A more complex implementation would involve separate state for each column.

        setDeals(newDeals);
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <DealColumn
            key={stage}
            stage={stage}
            deals={deals.filter((d) => d.stage === stage)}
          />
        ))}
      </div>
    </DndContext>
  );
}
