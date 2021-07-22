import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { AliyunOss } from '@zero-d/rn-oss';
import { Button } from 'react-native-paper'
import ImagePicker from 'react-native-image-picker'

const instant = new AliyunOss({
  accessKey: '',
  secretKey: '',
  endPoint: '',
  bucketName: ''
})

var options = {
  title: '请选择图片',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择图片',
  cancelButtonTitle: '取消',
  maxWidth: 907,
  quality: 0.8,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
};

const BasePath = 'Rescourse/Topic/';

function createOssPath(ossBasePath: string) {
  let fileName = `ooifidgi.png`;
  let nowDate = 'dsjfgjdgjkdhjkghjfdkg' + new Date().getTime();
  return `${ossBasePath + nowDate}/${fileName}`;
}

export default function App() {
  const [result, setResult] = React.useState<string[]>([]);

  function upLoad() {
    ImagePicker.showImagePicker(options, async (response) => {
      try {
        if (response.didCancel) {
        }
        else if (response.error) {
        }
        else {
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          //let path=createOssPath(ossPath);

          let path = createOssPath(BasePath);
          console.log('path: ', path);
          let res = await instant.asyncUpload({
            objectKey: path,
            filepath: response.uri
          })
          console.log('res: ', res, 'http://oss.huijiaoketang.com/' + path);
        }
      } catch (e) {
        console.log('e: ', e);

      }
    });
  }

  return (
    <View style={styles.container}>
      {
        result.map((item, index) =>
          <Text key={index} style={{ fontSize: 32 }} >{item}</Text>
        )
      }
      <Button mode="contained" onPress={upLoad}>
        上传
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
