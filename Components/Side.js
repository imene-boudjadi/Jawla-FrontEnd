import React from 'react'
import ReactDOM from 'react-dom'
import { Position, SideSheet, Pane, Heading, Paragraph, Tablist, Tab, Card, Button } from 'evergreen-ui'

export default function Side({show, lieu}) {
    const [isShown, setIsShown] = React.useState(show)
    const [selectedIndex, setSelectedIndex] = React.useState(0)



    return (
      <React.Fragment>
        <SideSheet
          position={Position.LEFT}
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>Title</Heading>
              <Paragraph size={400} color="muted">
                Optional description or sub title
              </Paragraph>
            </Pane>
            <Pane display="flex" padding={8}>
              <Tablist>
                {['Informations', 'Evénements', 'Photos'].map((tab, index) => (
                  <Tab
                    key={tab}
                    isSelected={selectedIndex === index}
                    onSelect={() => setSelectedIndex(index)}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tablist>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            <Card
              backgroundColor="white"
              elevation={0}
              height={240}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading>Some content</Heading>
            </Card>
          </Pane>
        </SideSheet>
        
      </React.Fragment>
    )
  }