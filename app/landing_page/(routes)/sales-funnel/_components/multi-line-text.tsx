import { cn } from "@/lib/utils";

type MultiLineTextProps = {
    text: string;
    className?: string;
    as?: "p" | "div";
};

export function MultiLineText({
    text,
    className,
    as: Tag = "p",
}: MultiLineTextProps) {
    const lines = text.split("\n").filter((line) => line.length > 0);

    if (lines.length === 0) {
        return null;
    }

    if (lines.length === 1) {
        return <Tag className={className}>{lines[0]}</Tag>;
    }

    return (
        <>
            {lines.map((line, index) => (
                <Tag key={`${index}-${line.slice(0, 24)}`} className={cn(className, index > 0 && "mt-2")}>
                    {line}
                </Tag>
            ))}
        </>
    );
}
