import React from 'react'
import { View, Text, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { constants } from '../../constants'

const ITEM_WIDTH = 120

const Walkthrough1 = () => {
  const [row1Images, setRow1Images] = React.useState([
    ...constants.walkthrough_01_01_images,
    ...constants.walkthrough_01_01_images
  ])
  const [row1CurrentPosition, setRow1CurrentPosition] = React.useState(0)

  const [row2Images, setRow2Images] = React.useState([
    ...constants.walkthrough_01_02_images,
    ...constants.walkthrough_01_02_images
  ])
  const [row2CurrentPosition, setRow2CurrentPosition] = React.useState(0)

  const row1FlatListRef = React.useRef(null)
  const row2FlatListRef = React.useRef(null)

  React.useEffect(() => {
    let positionTimer
    const timer = () => {
      positionTimer = setTimeout(() => {
        //Increment scroll position with each new interval

        // Slider 1
        setRow1CurrentPosition(prevPosition => {
          const newPosition = Number(prevPosition) + 1
          row1FlatListRef?.current?.scrollToOffset({
            offset: newPosition,
            animated: false
          })

          const maxOffset =
            constants.walkthrough_01_01_images.length * ITEM_WIDTH

          if (prevPosition > maxOffset) {
            const offset = prevPosition - maxOffset
            row1FlatListRef?.current?.scrollToOffset({
              offset: offset,
              animated: false
            })

            return offset
          } else {
            return newPosition
          }
        })

        // Slider 2
        setRow2CurrentPosition(prevPosition => {
          const newPosition = Number(prevPosition) + 1
          row2FlatListRef?.current?.scrollToOffset({
            offset: newPosition,
            animated: false
          })

          const maxOffset = constants.walkthrough_01_02_images.length * ITEM_WIDTH
          if (prevPosition > maxOffset) {
            const offset = prevPosition - maxOffset
            row2FlatListRef?.current?.scrollToOffset({
              offset: offset,
              animated: false
            })
            return offset
          } else {
            return newPosition
          }
        })

        timer()
      }, 32)
    }

    timer()
    return () => {
      clearTimeout(positionTimer)
    }
  }, [])

  return (
    <View style={{justifyContent: 'center'}}>
      {/* Slider 1 */}
      <FlatList
        data={row1Images}
        horizontal
        ref={row1FlatListRef}
        scrollEnabled={false}
        listKey='Slider1'
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `Slider1-${index}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image style={{ width: 110, height: 110 }} source={item} />
            </View>
          )
        }}
      />

      {/* Slider 1 */}
      <FlatList
        data={row2Images}
        ref={row2FlatListRef}
        scrollEventThrottle={16}
        horizontal
        decelerationRate={'fast'}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ transform: [{ rotate: '180deg' }] }}
        listKey='Slider2'
        keyExtractor={(_, index) => `Slider2-${index}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                transform: [{ rotate: '180deg' }]
              }}
            >
              <Image style={{ width: 110, height: 110 }} source={item} />
            </View>
          )
        }}
      />
    </View>
  )
}

export default Walkthrough1
