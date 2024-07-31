export interface Lesson {
    lesson_id: number | null;
    module_id: number;
    title: string;
    description: string;
    url: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    deleted: boolean;
}
