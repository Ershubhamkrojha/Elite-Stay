import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import {Button,Image,Text,VStack,Vatack,Box,Heading} from '@chakra-ui/react'


const PaymentSucess = () => {
  const [searchQuery] = useSearchParams();
  const reference_no = searchQuery.get("reference");
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run this effect only once after mounting

  return (
    <div>
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransforms={"uppercase"}>Booked Sucessfully</Heading>
        <text>Refernce no:-{reference_no}
        </text>
      </VStack>
    </Box>
    </div>
  )
}

export default PaymentSucess
