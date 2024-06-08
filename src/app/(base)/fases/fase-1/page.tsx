'use client'

import { Timer } from '@/components/Timer'
import { Progress } from '@/components/ui/progress'
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'

function Ring({ className = '', id, item }: { className?: string; id: string; item: any }) {
  const [asd, setAsd] = useState(item)

  useEffect(() => setAsd(item), [item])

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-36 2xl:w-44 h-36 2xl:h-44 rounded-full border-8 flex items-center justify-center ${className}`}
        >
          {asd.id && (
            <Draggable draggableId={asd.id} index={10}>
              {(provided) => (
                <img
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  src={item.src}
                ></img>
              )}
            </Draggable>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default function Phase1Page() {
  const [rings, setRings] = useState([
    { id: '1', color: 'border-gray-100', item: {} },
    { id: '2', color: 'border-yellow-400', item: {} },
    { id: '3', color: 'border-yellow-800', item: {} },
    { id: '4', color: 'border-red-600', item: {} },
    { id: '5', color: 'border-blue-500', item: {} },
  ])
  const [items, setItems] = useState([
    { id: '1', src: '/assets/svgs/sun.svg' },
    { id: '2', src: '/assets/svgs/thermometer.svg' },
    { id: '3', src: '/assets/svgs/dust.svg' },
    { id: '4', src: '/assets/svgs/water.svg' },
    { id: '5', src: '/assets/svgs/wind.svg' },
  ])

  function onDragEnd(e: DropResult) {
    if (!e.destination) return

    const source = e.source.droppableId
    const destination = e.destination.droppableId

    if (source === destination) return

    const sourceItem = items.find((_, i) => i === e.source.index)

    if (!sourceItem) return

    if (rings.find((r) => r.id === destination && r.item.id)) return

    setRings((rings) =>
      rings.map((r) => {
        if (r.id === destination) {
          return { ...r, item: sourceItem }
        }
        return r
      })
    )

    setItems((items) => items.filter((_, i) => i !== e.source.index))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Timer />
      <div className="max-h-screen w-screen flex gap-60 2xl:gap-96">
        <h1 className="text-3xl font-bold absolute left-1/2 top-4 2xl:top-8 -translate-x-1/2">
          Fase I: Crescendo
        </h1>
        <Droppable droppableId={'0'}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={'bg-green-800 w-96 flex justify-center gap-4 items-center flex-wrap'}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <img
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      src={item.src}
                      className="h-40"
                    ></img>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex gap-4 items-center">
          <div className="flex h-full 2xl:h-3/4 flex-wrap flex-col gap-8 justify-center">
            {rings.map((r, i) => (
              <Ring key={r.id} id={r.id} className={r.color} item={rings[i].item} />
            ))}
          </div>
        </div>
        <img
          src={`/assets/svgs/${(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}.svg`}
          className="h-64 2xl:h-80 absolute top-1/2 -translate-y-1/2 right-4 2xl:right-8"
        />
        <div className="absolute left-1/2 bottom-1 2xl:bottom-4 -translate-x-1/2 w-1/3 2xl:w-1/2 text-center">
          <Progress
            className="h-3 2xl:h-4"
            value={(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}
          />
          <p className="text-xl 2xl:mt-2">
            {(rings.reduce((acc, r) => (r.item.id ? acc + 1 : acc), 0) / rings.length) * 100}%
            completo
          </p>
        </div>
      </div>
    </DragDropContext>
  )
}
