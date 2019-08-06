import getDirections from 'react-native-google-maps-directions'
import { View, Text, Dimensions, Image, StyleSheet} from "react-native";

export default class App extends Component {
 
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 6.79535608,
        longitude: 79.90547115
      },
      destination: {
        latitude:6.927079,
        longitude:79.861244
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: [
      ]
    }
 
    getDirections(data)
  }
 
  render() {
    return (
      <View>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}