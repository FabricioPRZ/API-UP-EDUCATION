export interface Course {
    course_id: number | null;
    title: string;
    subject: string;
    purpose: string;
    description: string;
    lessonNumber: number;
    teacher: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    deleted: boolean;
}