import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Link: {
      // 1. We can update the base styles
      baseStyle: {
        textDecoration: 'underline', // Normally, it is "semibold"
      },
    },
  },
})
