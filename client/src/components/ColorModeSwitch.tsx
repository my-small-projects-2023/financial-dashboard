import { HStack, Switch, useColorMode, Text } from "@chakra-ui/react"

const ColorModeSwitch = () => {

    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <HStack>
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            <Text>
                {
                    colorMode === 'dark' ? 'Light' : 'Dark'
                }
            </Text>
        </HStack>
    )
}

export default ColorModeSwitch;