import * as React from 'react'

import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Link,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

import { SortableTh } from '../../../utils/SortableTh'
import { SortableButton } from '../../../utils/SortableButton'

interface SkaterScoringLeadersProps {
  skaterScoring: SkaterScoring[]
}

export const SkaterScoringLeaders: React.FC<SkaterScoringLeadersProps> = ({ skaterScoring }) => {
  const [category, setCategory] = React.useState('points')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'points') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'points'))
      setSortAttribute('points')
    } else if (category === 'goals') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'goals'))
      setSortAttribute('goals')
    } else if (category === 'shooting') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'shots_on_goal'))
      setSortAttribute('shots_on_goal')
    } else if (category === 'penalties') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'penalty_minutes'))
      setSortAttribute('pims')
    } else if (category === 'faceoffs') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'fo_taken'))
      setSortAttribute('fo_taken')
    }
  }, [category, skaterScoring])

  const getSortedSkaters = (skaters: SkaterScoring[], attr: string) => {
    return skaters.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

      if (stat_A !== null && stat_B !== null) {
        return parseFloat(stat_B) - parseFloat(stat_A)
      }
      //move nulls to the bottom
      if (stat_A === null) {
        return 1
      }
      if (stat_B === null) {
        return -1
      }
      return 0
    })
  }

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedSkaters(getSortedSkaters(skaterScoring, attr))
      setSortAttribute(attr)
    }
  }

  return (
    <Box>
      {/* stat select */}
      <HStack mb={2}>
        <Text>Categories:</Text>
        <Select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          bg='cyan.200'
          defaultValue='points'
        >
          <option value='points'>Points</option>
          <option value='goals'>Goals</option>
          <option value='shooting'>Shooting</option>
          <option value='penalties'>Penalties</option>
          <option value='faceoffs'>Faceoffs</option>
        </Select>
      </HStack>

      {/* scoring */}

      {category === 'points' && (
        <>
          <HStack mb={2}>
            <Text>Sort Column:</Text>
            <Box d='flex' alignItems='center' justifyContent='center'>
              <SortableButton
                attribute='games_played'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                GP
              </SortableButton>
              <SortableButton
                attribute='points'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                P
              </SortableButton>
              <SortableButton
                attribute='goals'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                G
              </SortableButton>
              <SortableButton
                attribute='assists'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                A
              </SortableButton>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RK</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='games_played'>
                    GP
                  </SortableTh>
                  <Th px={1}>ATOI</Th>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='points'>
                    P
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='goals'>
                    G
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='assists'>
                    A
                  </SortableTh>
                </Tr>
              </Thead>
              <Tbody>
                {sortedSkaters.map((skater, idx) => {
                  return (
                    <Tr key={skater.player_id}>
                      <Td px={1}>{idx + 1}</Td>
                      <Td px={1}>{skater.position}</Td>
                      <Td px={1}>
                        <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                          {skater.player}
                        </Link>
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                      >
                        {skater.games_played}
                      </Td>
                      <Td px={1}>{skater.average_time_on_ice}</Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'points' ? 'bold' : 'normal'}
                      >
                        {skater.points}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}
                      >
                        {skater.goals}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'assists' ? 'bold' : 'normal'}
                      >
                        {skater.assists}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {/* goals */}
      {category === 'goals' && (
        <>
          <HStack mb={2}>
            <Text>Sort Column:</Text>
            <Box d='flex' alignItems='center' justifyContent='center'>
              <Button
                p={0}
                m={1}
                value='games_played'
                onClick={handleSortColumn}
                bg={sortAttribute === 'games_played' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'games_played' ? 'white' : 'black'}
              >
                GP
              </Button>
              <Button
                p={0}
                m={1}
                value='goals'
                onClick={handleSortColumn}
                bg={sortAttribute === 'goals' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'goals' ? 'white' : 'black'}
              >
                G
              </Button>
              <Button
                p={0}
                m={1}
                value='pp_goals'
                onClick={handleSortColumn}
                bg={sortAttribute === 'pp_goals' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'pp_goals' ? 'white' : 'black'}
              >
                PP
              </Button>
              <Button
                p={0}
                m={1}
                value='gw_goals'
                onClick={handleSortColumn}
                bg={sortAttribute === 'gw_goals' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'gw_goals' ? 'white' : 'black'}
              >
                GW
              </Button>
              <Button
                p={0}
                m={1}
                value='sh_goals'
                onClick={handleSortColumn}
                bg={sortAttribute === 'sh_goals' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'sh_goals' ? 'white' : 'black'}
              >
                SH
              </Button>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RK</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh ThAttribute='games_played' sortAttribute={sortAttribute}>
                    GP
                  </SortableTh>
                  <Th px={1}>ATOI</Th>
                  <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                    G
                  </SortableTh>
                  <SortableTh ThAttribute='pp_goals' sortAttribute={sortAttribute}>
                    PP
                  </SortableTh>
                  <SortableTh ThAttribute='gw_goals' sortAttribute={sortAttribute}>
                    GW
                  </SortableTh>
                  <SortableTh ThAttribute='sh_goals' sortAttribute={sortAttribute}>
                    SH
                  </SortableTh>
                </Tr>
              </Thead>
              <Tbody>
                {sortedSkaters.map((skater, idx) => {
                  return (
                    <Tr key={skater.player_id}>
                      <Td px={1}>{idx + 1}</Td>
                      <Td px={1}>{skater.position}</Td>
                      <Td px={1}>
                        <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                          {skater.player}
                        </Link>
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                      >
                        {skater.games_played}
                      </Td>
                      <Td px={1} isNumeric>
                        {skater.average_time_on_ice}
                      </Td>

                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}
                      >
                        {skater.goals}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'pp_goals' ? 'bold' : 'normal'}
                      >
                        {skater.pp_goals}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'gw_goals' ? 'bold' : 'normal'}
                      >
                        {skater.gw_goals}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'sh_goals' ? 'bold' : 'normal'}
                      >
                        {skater.sh_goals}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {/* shooting */}
      {category === 'shooting' && (
        <>
          <HStack mb={2}>
            <Text>Sort Column:</Text>
            <Box d='flex' alignItems='center' justifyContent='center'>
              <Button
                p={0}
                m={1}
                value='games_played'
                onClick={handleSortColumn}
                bg={sortAttribute === 'points' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'points' ? 'white' : 'black'}
              >
                GP
              </Button>
              <Button
                p={0}
                m={1}
                value='goals'
                onClick={handleSortColumn}
                bg={sortAttribute === 'goals' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'goals' ? 'white' : 'black'}
              >
                G
              </Button>
              <Button
                p={0}
                m={1}
                value='shots_on_goal'
                onClick={handleSortColumn}
                bg={sortAttribute === 'shots_on_goal' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'shots_on_goal' ? 'white' : 'black'}
              >
                S
              </Button>
              <Button
                p={0}
                m={1}
                value='shooting_percentage'
                onClick={handleSortColumn}
                bg={sortAttribute === 'shooting_percentage' ? 'blackAlpha.800' : 'blackAlpha.300'}
                color={sortAttribute === 'shooting_percentage' ? 'white' : 'black'}
              >
                S %
              </Button>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RK</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh ThAttribute='games_played' sortAttribute={sortAttribute}>
                    GP
                  </SortableTh>
                  <Th px={1}>ATOI</Th>
                  <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                    G
                  </SortableTh>
                  <SortableTh ThAttribute='shots_on_goal' sortAttribute={sortAttribute}>
                    S
                  </SortableTh>
                  <SortableTh ThAttribute='shooting_percentage' sortAttribute={sortAttribute}>
                    S %
                  </SortableTh>
                </Tr>
              </Thead>
              <Tbody>
                {sortedSkaters.map((skater, idx) => {
                  return (
                    <Tr key={skater.player_id}>
                      <Td px={1}>{idx + 1}</Td>
                      <Td px={1}>{skater.position}</Td>
                      <Td px={1}>
                        <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                          {skater.player}
                        </Link>
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                      >
                        {skater.games_played}
                      </Td>
                      <Td px={1} isNumeric>
                        {skater.average_time_on_ice}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}
                      >
                        {skater.goals}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'shots_on_goal' ? 'bold' : 'normal'}
                      >
                        {skater.shots_on_goal}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'shooting_percentage' ? 'bold' : 'normal'}
                      >
                        {skater.shooting_percentage}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {/* physical */}
      {category === 'penalties' && (
        <>
          <HStack mb={2}>
            <Text>Sort Column:</Text>
            <Box d='flex' alignItems='center' justifyContent='center'>
              <SortableButton
                attribute={'games_played'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                GP
              </SortableButton>
              <SortableButton
                attribute={'points'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                PTS
              </SortableButton>
              <SortableButton
                attribute={'hits'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                HITS
              </SortableButton>
              <SortableButton
                attribute={'penalty_minutes'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                PIMS
              </SortableButton>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RK</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh ThAttribute='games_played' sortAttribute={sortAttribute}>
                    GP
                  </SortableTh>
                  <Th px={1}>ATOI</Th>
                  <SortableTh ThAttribute='points' sortAttribute={sortAttribute}>
                    Pts
                  </SortableTh>
                  <SortableTh ThAttribute='hits' sortAttribute={sortAttribute}>
                    hits
                  </SortableTh>
                  <SortableTh ThAttribute='penalty_minutes' sortAttribute={sortAttribute}>
                    Pims
                  </SortableTh>
                </Tr>
              </Thead>

              <Tbody>
                {sortedSkaters.map((skater, idx) => {
                  return (
                    <Tr key={skater.player_id}>
                      <Td px={1}>{idx + 1}</Td>
                      <Td px={1}>{skater.position}</Td>
                      <Td px={1}>
                        <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                          {skater.player}
                        </Link>
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                      >
                        {skater.games_played}
                      </Td>
                      <Td px={1}>{skater.average_time_on_ice}</Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'points' ? 'bold' : 'normal'}
                      >
                        {skater.points}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'hits' ? 'bold' : 'normal'}
                      >
                        {skater.hits}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'penalty_minutes' ? 'bold' : 'normal'}
                      >
                        {skater.penalty_minutes}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {/* faceoffs */}
      {category === 'faceoffs' && (
        <>
          <HStack mb={2}>
            <Text>Sort Column:</Text>
            <Box d='flex' alignItems='center' justifyContent='center'>
              <SortableButton
                attribute={'games_played'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                GP
              </SortableButton>
              <SortableButton
                attribute={'faceoff_wins'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                WINS
              </SortableButton>
              <SortableButton
                attribute={'faceoff_taken'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                TAKEN
              </SortableButton>
              <SortableButton
                attribute={'faceoff_percentage'}
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                %
              </SortableButton>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RK</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='games_played'>
                    GP
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_wins'>
                    WINS
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_taken'>
                    TAKEN
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_percentage'>
                    %
                  </SortableTh>
                </Tr>
              </Thead>
              <Tbody>
                {sortedSkaters.map((skater, idx) => {
                  return (
                    <Tr key={skater.player_id}>
                      <Td px={1}>{idx + 1}</Td>
                      <Td px={1}>{skater.position}</Td>
                      <Td px={1}>
                        <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                          {skater.player}
                        </Link>
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                      >
                        {skater.games_played}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'faceoff_wins' ? 'bold' : 'normal'}
                      >
                        {skater.faceoff_wins}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'faceoff_taken' ? 'bold' : 'normal'}
                      >
                        {skater.faceoff_wins + skater.faceoff_losses}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'faceoff_percentage' ? 'bold' : 'normal'}
                      >
                        {skater.faceoff_percentage}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  )
}
