import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function App() {
  const [currentTime, setCurrentTime] = useState("9:41");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const slideData = [
    { text: "지금 집에 불이 켜져 있어요" },
    { text: "현재 온도가 적정합니다" },
    { text: "공기질이 양호합니다" },
  ];

  const dashboardData = [
    {
      icon: require("./assets/icon/Temperature.png"),
      key: "온도",
      value: "24.5℃",
    },
    { icon: require("./assets/icon/humidity.png"), key: "습도", value: "45%" },
    {
      icon: require("./assets/icon/Compounds.png"),
      key: "미세먼지",
      value: "35㎍/㎥",
    },
    {
      icon: require("./assets/icon/Leaf.png"),
      key: "이산화탄소",
      value: "880ppm",
    },
  ];

  const handleSlidePress = () => {
    setCurrentSlide((currentSlide + 1) % slideData.length);
  };

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Status Bar - 위치만 조정 */}
      <View style={styles.statusBar} />

      {/* Setting Button */}
      <TouchableOpacity style={styles.settingBtn}>
        <Image
          source={require("./assets/icon/Setting_fill.png")}
          style={styles.settingIcon}
        />
      </TouchableOpacity>

      {/* Status Slide */}
      <TouchableOpacity style={styles.statusSlide} onPress={handleSlidePress}>
        <View style={styles.slideContent}>
          <Image
            source={require("./assets/img/house.png")}
            style={styles.slideImage}
          />
          <Text style={styles.slideText}>{slideData[currentSlide].text}</Text>
          <View style={styles.slideIndicators}>
            {slideData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlide && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>

      {/* Dashboard */}
      <View style={styles.dashboard}>
        {dashboardData.map((item, index) => (
          <View key={index} style={styles.dashboardItem}>
            <View style={styles.itemHeader}>
              <Image source={item.icon} style={styles.itemIcon} />
              <Text style={styles.itemKey}>{item.key}</Text>
            </View>
            <Text style={styles.itemValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.icon} />
        <View style={styles.icon} />
        <TouchableOpacity
          style={[styles.micBtn, isPopupVisible && styles.micBtnRecording]}
          onPress={openPopup}
        >
          <Image
            source={require("./assets/icon/Mic.png")}
            style={styles.micIcon}
          />
        </TouchableOpacity>
        <View style={styles.icon} />
        <View style={styles.icon} />
      </View>

      {/* Popup */}
      {isPopupVisible && (
        <View style={styles.popupOverlay}>
          <TouchableOpacity
            style={styles.popupOverlayTouch}
            onPress={closePopup}
          >
            <View style={styles.popupContainer}>
              <Text style={styles.popupTitle}>음성 인식</Text>
              <Text style={styles.popupSubtitle}>말씀해 주세요...</Text>
              <View style={styles.voiceIndicator}>
                <View style={styles.voiceWave} />
                <View style={styles.voiceWave} />
                <View style={styles.voiceWave} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 62,
    paddingBottom: 90,
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 62,
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  settingBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  settingIcon: {
    fontSize: 24,
    width: 24,
    height: 24,
  },
  statusSlide: {
    marginTop: 80,
    marginHorizontal: 20,
    height: 200,
    backgroundColor: "#ffeaea",
    borderRadius: 20,
    shadowColor: "rgba(180, 140, 140, 0.6)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 8,
  },
  slideContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  slideImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  slideText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3e4f6c",
    textAlign: "center",
    marginBottom: 20,
  },
  slideIndicators: {
    flexDirection: "row",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  indicatorActive: {
    backgroundColor: "#3e4f6c",
  },
  dashboard: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  dashboardItem: {
    width: (width - 55) / 2,
    height: 120,
    backgroundColor: "#d4e8f0",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  itemKey: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3e4f6c",
  },
  itemValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3e4f6c",
    textAlign: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 90,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  icon: {
    width: 24,
    height: 24,
  },
  micBtn: {
    width: 90,
    height: 90,
    backgroundColor: "#3e4f6c",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    shadowColor: "rgba(62, 79, 108, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  micBtnRecording: {
    backgroundColor: "#ff4757", // 팝업 상태일 때 빨간색으로 변경
  },
  micIcon: {
    fontSize: 32,
    width: 32,
    height: 32,
    color: "#fff",
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popupOverlayTouch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    maxWidth: 300,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3e4f6c",
    marginBottom: 10,
  },
  popupSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  voiceIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  voiceWave: {
    width: 4,
    height: 20,
    backgroundColor: "#3e4f6c",
    borderRadius: 2,
  },
});
