import {
  Component,
  ViewChild,
  TemplateRef,
  effect,
  signal,
  inject,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet,DOCUMENT  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CalendarModule, CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EventColor } from 'calendar-utils';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlatpickrDirective } from 'angularx-flatpickr';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { ModalService } from '../../../shared/modal/service/modal.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

interface ModalData {
  action: string;
  event: CalendarEvent;
}

@Component({
  selector: 'component-calendar',
  imports: [CommonModule, FormsModule, CalendarModule, NgbModalModule, FlatpickrDirective, ModalComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<NgTemplateOutlet>;

  modalService = inject(ModalService);
  // private modalService = inject(NgbModal);

  CalendarView = CalendarView
  view = signal<CalendarView>(CalendarView.Month);
  viewDate = signal<Date>(new Date());
  modalData = signal<ModalData | null>(null);
  activeDayIsOpen = signal<boolean>(false);
  refresh = new Subject<void>();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events.update((events) => events.filter((iEvent) => iEvent !== event));
        this.handleEvent('Deleted', event);
      },
    },
  ];
  events = signal<CalendarEvent[]>([
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ]);

  constructor() {
    effect(() => {
      this.refresh.next();
    });
  }

  private readonly darkThemeClass = 'dark-theme';
  private document = inject(DOCUMENT);

  ngOnInit(): void {
    document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    document.body.classList.remove(this.darkThemeClass);
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate())) {
      if (
        (isSameDay(this.viewDate(), date) && this.activeDayIsOpen()) ||
        events.length === 0
      ) {
        this.activeDayIsOpen.set(false);
      } else {
        this.activeDayIsOpen.set(true);
        console.log(`Seleccione este dia: ${date}`);
      }
      this.viewDate.set(date);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events.update((events) =>
      events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      })
    );
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if(action.includes('Edit')  || action.includes('Delete') ){
      this.modalService.openModal()
    //   this.modalData.set({ action: action, event: event });
    //   this.modalService.open(this.modalContent, {
    //     animation: true,
    //     size: 'sm',
    //     centered: true, // Centra el modal en la pantalla
    //   });
    }
  }

  addEvent(): void {
    this.events.update((events) => [
      ...events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events.update((events) => events.filter((event) => event !== eventToDelete));
  }

  setView(view: CalendarView): void {
    this.view.set(view);
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen.set(false);
  }
}
