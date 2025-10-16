'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

type Deal = {
  id: string
  title: string
  company: string
  value: number
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'
  priority: 'Low' | 'Medium' | 'High'
  closeDate: string
  owner: {
    name: string
    fallback: string
    avatarUrl?: string
  }
}

const initialDeals: Deal[] = [
  {
    id: '1',
    title: 'Website Redesign',
    company: 'Innovate Inc.',
    value: 10000,
    stage: 'Lead',
    priority: 'Medium',
    closeDate: '2025-12-31',
    owner: { name: 'John Doe', fallback: 'JD' },
  },
  {
    id: '2',
    title: 'Mobile App Development',
    company: 'Synergy Corp.',
    value: 25000,
    stage: 'Qualified',
    priority: 'High',
    closeDate: '2025-11-30',
    owner: { name: 'Jane Smith', fallback: 'JS' },
  },
  {
    id: '3',
    title: 'Cloud Migration',
    company: 'Quantum Solutions',
    value: 50000,
    stage: 'Proposal',
    priority: 'High',
    closeDate: '2025-10-31',
    owner: { name: 'Peter Jones', fallback: 'PJ' },
  },
  {
    id: '4',
    title: 'New Marketing Campaign',
    company: 'Apex Industries',
    value: 5000,
    stage: 'Won',
    priority: 'Low',
    closeDate: '2025-09-30',
    owner: { name: 'Mary Johnson', fallback: 'MJ' },
  },
  {
    id: '5',
    title: 'E-commerce Platform',
    company: 'Starlight Enterprises',
    value: 30000,
    stage: 'Lost',
    priority: 'Medium',
    closeDate: '2025-08-31',
    owner: { name: 'David Williams', fallback: 'DW' },
  },
  {
    id: '6',
    title: 'CRM Implementation',
    company: 'Innovate Inc.',
    value: 45000,
    stage: 'Lead',
    priority: 'High',
    closeDate: '2026-01-15',
    owner: { name: 'John Doe', fallback: 'JD' },
  },
]

const stages = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost']

const priorityVariantMap: {
  [key: string]: 'default' | 'secondary' | 'destructive'
} = {
  Low: 'secondary',
  Medium: 'default',
  High: 'destructive',
}

function SortableItem({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold">{deal.title}</p>
            <Avatar className="size-6">
              <AvatarImage src={deal.owner.avatarUrl} />
              <AvatarFallback>{deal.owner.fallback}</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-sm text-muted-foreground">{deal.company}</p>
          <p className="text-sm font-bold mt-2">
            ${deal.value.toLocaleString()}
          </p>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <Badge variant={priorityVariantMap[deal.priority]}>
              {deal.priority}
            </Badge>
            <span>{deal.closeDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DealColumn({ stage, deals }: { stage: string; deals: Deal[] }) {
  return (
    <Card className="w-full bg-muted/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{stage}</CardTitle>
        <span className="text-sm font-bold">{deals.length}</span>
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
      {stage === 'Lead' && (
        <CardFooter>
          <Button variant="ghost" className="w-full">
            <PlusCircle className="mr-2" />
            Create Deal
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export function DealsBoard() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = deals.findIndex((d) => d.id === active.id)
      const newIndex = deals.findIndex((d) => d.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newDeals = arrayMove(deals, oldIndex, newIndex)
        // This is a simplified logic. A real implementation would need to know which column the item was dropped into.
        // For this example, we'll just reorder the list, but the stage of the deal won't change.
        // A more complex implementation would involve separate state for each column.
        setDeals(newDeals)
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
  )
}
