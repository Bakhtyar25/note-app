import { useEffect, useMemo, useRef } from 'react';
import { createSwapy } from 'swapy';
import { updateNote } from '@/actions/note';
import { useCookieUser } from '@/providers/cookie-provider';

type UseDragAndDropProps = {
  items: Note[];
  setItems: React.Dispatch<React.SetStateAction<Note[]>>;
  refs: Record<string, React.RefObject<HTMLDivElement | null>>;
  predicates: Record<string, (note: Note) => boolean>;
};

export function useDragAndDrop({ items, setItems, refs, predicates }: UseDragAndDropProps) {
  const { user } = useCookieUser();
  const itemsRef = useRef(items);

  // Keep ref in sync
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Create membership keys for each group
  const membershipKeys = useMemo(() => {
    const keys: Record<string, string> = {};
    Object.entries(predicates).forEach(([key, predicate]) => {
      keys[key] = items.filter(predicate).map(n => n.id).sort().join('|');
    });
    return keys;
  }, [items, predicates]);

  useEffect(() => {
    const swapyInstances: Array<{ destroy: () => void } | null> = [];

    Object.entries(refs).forEach(([key, ref]) => {
      const el = ref.current;
      const predicate = predicates[key];
      
      if (!el || !predicate) return;

      const sw = createSwapy(el, { animation: 'dynamic' });
      
      sw.onSwap(async () => {
        const slots = Array.from(el.querySelectorAll<HTMLElement>('[data-swapy-slot]'));
        const newOrder: Record<string, number> = {};
        
        slots.forEach((slot, index) => {
          const id = slot.dataset.swapySlot;
          if (id) newOrder[id] = index;
        });

        // Optimistic update
        setItems((prev: Note[]) => 
          prev.map((n: Note) => 
            predicate(n) && newOrder[n.id] !== undefined 
              ? { ...n, order: newOrder[n.id]! } 
              : n
          )
        );

        // Persist changes
        if (!user?.id) return;
        
        const changed = itemsRef.current.filter(n => 
          predicate(n) && 
          newOrder[n.id] !== undefined && 
          n.order !== newOrder[n.id]
        );

        await Promise.all(
          changed.map(n => 
            updateNote({
              UserId: user.id!,
              id: n.id,
              title: n.title,
              content: n.content,
              priority: n.priority,
              order: newOrder[n.id]!,
              status: n.status,
              date: Math.floor(n.date.getTime() / 1000),
            })
          )
        );

        // Sync ref
        itemsRef.current = itemsRef.current.map(n => 
          predicate(n) && newOrder[n.id] !== undefined 
            ? { ...n, order: newOrder[n.id]! } 
            : n
        );
      });

      swapyInstances.push(sw);
    });

    return () => {
      swapyInstances.forEach(instance => instance?.destroy());
    };
  }, [Object.values(membershipKeys), setItems, predicates, user?.id]);
}
