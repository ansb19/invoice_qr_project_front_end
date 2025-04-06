import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Platform } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "outline" | "disabled";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  loading = false,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" && styles.primary,
        type === "outline" && styles.outline,
        type === "disabled" && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={type === "disabled" || loading}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={type === "outline" ? "#007bff" : "#fff"} />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text
              style={[
                styles.text,
                type === "outline" && styles.textOutline,
                type === "disabled" && styles.textDisabled,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    minWidth: 150,
    width: Platform.OS === 'web' ? "50%" : "40%",
  },
  primary: {
    backgroundColor: "#007bff",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textOutline: {
    color: "#007bff",
  },
  textDisabled: {
    color: "#666",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;
