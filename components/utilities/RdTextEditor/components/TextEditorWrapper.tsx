import { Box, styled } from '@/mui'

export const TextEditorWrapper = styled(Box)(({ theme }) => {
  return {
    '.tox-tinymce': {
      borderWidth: '1px',
      borderColor: theme.palette.inputBorder.main,
      borderRadius: '4px',
      '&:not(.tox-tinymce-inline) .tox-editor-header': {
        backgroundColor: theme.palette.white.main
      },
      '.tox-toolbar-overlord': {
        backgroundColor: theme.palette.white.main,
        color: theme.palette.black.main
      },
      '.tox-toolbar__primary': {
        backgroundColor: theme.palette.white.main,
        color: theme.palette.black.main
      },
      '.tox-edit-area__iframe': {
        backgroundColor: theme.palette.tinyEditor.main
      },
      '.tox-statusbar': {
        backgroundColor: theme.palette.white.main,
        color: theme.palette.black.main
      },
      '.tox-tbtn svg': {
        color: theme.palette.black.main
      }
    }
  }
})
