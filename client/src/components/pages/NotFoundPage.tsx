import { Heading, Box } from '@chakra-ui/react'

const NotFoundPage = () => {
  return (
    <Box display="flex" justifyContent="center" paddingY={5}>
    <Heading as='h3' size='lg'>
      Not Found 404.
    </Heading>
  </Box>
  )
}

export default NotFoundPage
