import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

/**
 * The only purpose of this file is to import this component dynamically.
 */
export default styled(MDEditor.Markdown)`
    & * {
        font-family: 'Merriweather', serif;
    }
`;
