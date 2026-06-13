import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type SessionAccordionProps = {
    sessions: ISalesFunnelSession[];
    groupSize?: number;
    groupHeading?: (start: number, end: number) => string;
};

function defaultGroupHeading(start: number, end: number) {
    return `Sessions ${start}–${end}`;
}

export function SessionAccordion({
    sessions,
    groupSize = 10,
    groupHeading = defaultGroupHeading,
}: SessionAccordionProps) {
    const groups: ISalesFunnelSession[][] = [];

    for (let index = 0; index < sessions.length; index += groupSize) {
        groups.push(sessions.slice(index, index + groupSize));
    }

    return (
        <div className="space-y-6">
            {groups.map((group) => {
                const start = group[0]?.number ?? 0;
                const end = group[group.length - 1]?.number ?? start;

                return (
                    <section
                        key={`${start}-${end}`}
                        className="sales-funnel-session-group"
                        style={{ contentVisibility: "auto" }}
                    >
                        <h3 className="text-lg font-semibold mb-3">
                            {groupHeading(start, end)}
                        </h3>

                        <Accordion type="multiple" className="border rounded-md text-sm">
                            {group.map((session) => (
                                <AccordionItem
                                    key={session.number}
                                    value={`session-${session.number}`}
                                >
                                    <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline text-left">
                                        <span>
                                            Session {session.number}
                                            <span className="text-gray-500 font-normal ml-2">
                                                ({session.duration})
                                            </span>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-3">
                                        <ul className="list-disc pl-5 space-y-1">
                                            {session.topics.map((topic) => (
                                                <li key={topic}>{topic}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                );
            })}
        </div>
    );
}
