import MDEditor, {
    ICommand,
    codeEdit,
    codePreview,
} from '@uiw/react-md-editor';
import { FaEye } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

import './markdown.styles.css';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string | undefined) => void;
    onDelete?: () => void;
};

const MarkdownEditor = ({ value, onChange, onDelete }: MarkdownEditorProps) => {
    const DeleteButton: ICommand = {
        name: 'delete',
        keyCommand: 'delete',
        buttonProps: { 'aria-label': 'Delete section' },
        icon: (
            <span
                title="Delete this section"
                className="flex mx-2 text-red-600"
            >
                <RiDeleteBinLine />
            </span>
        ),
        execute: onDelete,
    };

    const customCodePreview: ICommand = {
        ...codePreview,
        icon: (
            <span className="flex font-semibold gap-1 mx-2">
                <FaEye /> Preview
            </span>
        ),
    };

    const customCodeEdit: ICommand = {
        ...codeEdit,
        icon: (
            <span className="flex font-semibold gap-1 mx-2">
                <FiEdit /> Edit
            </span>
        ),
    };

    // Buttons on the right side of the toolbar
    const extraCommands = [customCodePreview, customCodeEdit, DeleteButton];

    return (
        <MDEditor
            height={300}
            tabSize={4}
            preview="edit"
            data-color-mode="light"
            value={value}
            onChange={onChange}
            extraCommands={extraCommands}
        />
    );
};

export default MarkdownEditor;
