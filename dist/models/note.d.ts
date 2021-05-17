import { Document } from 'mongoose';
interface NoteInterface extends Document {
    title: string;
    body: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta';
}
export declare const Note: import("mongoose").Model<NoteInterface, {}, {}>;
export {};
