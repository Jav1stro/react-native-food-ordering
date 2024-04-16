import { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@components/ProductListItem";
import Button from "@components/Button";
import Colors from "@constants/Colors";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    console.warn("Adddding to cart", selectedSize);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={{ fontSize: 18, fontWeight: "500" }}>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size, i) => (
          <Pressable
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? `${Colors.light.tint}` : "white",
              },
            ]}
            key={i}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              key={i}
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "white" : "grey",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: { fontSize: 18, fontWeight: "bold", marginTop: "auto" },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
