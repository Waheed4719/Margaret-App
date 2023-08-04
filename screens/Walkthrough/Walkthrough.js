import React from 'react'
import { View, Text, FlatList, Dimensions, Image, Animated } from 'react-native'
import {
  FONTS,
  contstants,
  images,
  constants,
  SIZES,
  COLORS
} from '../../constants'
import { TextButton } from '../../components'
import Walkthrough1 from './Walkthrough1'
import Walkthrough2 from './Walkthrough2'
const { height, width } = SIZES

const Walkthrough = () => {
  const [walkthrough2Animate, setWalkthrough2Animate] = React.useState(false)
  const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
    if (viewableItems[0].key == 1) {
      setWalkthrough2Animate(true)
    } else {
      setWalkthrough2Animate(false)
    }
  })
  const scrollX = React.useRef(new Animated.Value(0)).current

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {constants.walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                height: 10,
                width: 10,
                marginHorizontal: 6,
                backgroundColor: dotColor
              }}
            />
          )
        })}
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.2,
          width: width,
          justifyContent: 'space-between',
          paddingVertical: SIZES.padding,
          paddingHorizontal: height > 700 ? SIZES.padding : 20
        }}
      >
        <Dots />
        <View
          style={{
            flexDirection: 'row',
            height: 55
          }}
        >
          <TextButton
            label={'Join Now'}
            contentContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGrey
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3
            }}
          />
          <TextButton
            label={'Log In'}
            contentContainerStyle={{
              flex: 1,
              marginLeft: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h3
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <Animated.FlatList
        style={{ marginTop: SIZES.padding }}
        data={constants.walkthrough}
        decelerationRate={'fast'}
        horizontal
        keyExtractor={item => item.id}
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false
          },
          {}
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: width, flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                {index == 0 && <Walkthrough1 />}
                {index == 1 && <Walkthrough2 animate= {walkthrough2Animate}/>}
              </View>
              <View
                style={{
                  height: height * 0.35,
                  marginTop: 'auto',
                  paddingHorizontal: SIZES.padding,
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#000', ...FONTS.h1 }}>{item.title}</Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.grey,
                    marginTop: SIZES.radius,
                    textAlign: 'center'
                  }}
                >
                  {item.sub_title}
                </Text>
              </View>
            </View>
          )
        }}
      />
      {renderFooter()}
    </View>
  )
}

export default Walkthrough
