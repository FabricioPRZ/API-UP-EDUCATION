export interface Progress {
    progress_id: number | null;
    user_id: number | null;
    course_id: number | null;
    porcentaje: string;
    complete: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    deleted: boolean;
}
