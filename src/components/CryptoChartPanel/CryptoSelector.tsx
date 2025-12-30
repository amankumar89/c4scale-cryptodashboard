import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import type { CryptoOption } from '../../types/crypto.types';

interface CryptoSelectorProps {
  cryptoList: CryptoOption[];
  selectedCrypto: string;
  onCryptoChange: (cryptoId: string) => void;
  loading: boolean;
}

export default function CryptoSelector({
  cryptoList,
  selectedCrypto,
  onCryptoChange,
  loading,
}: CryptoSelectorProps) {
  const selectedOption = cryptoList.find((c) => c.id === selectedCrypto);

  return (
    <Autocomplete
      options={cryptoList}
      getOptionLabel={(option) => `${option.name} (${option.symbol})`}
      value={selectedOption || null}
      onChange={(_, newValue) => {
        if (newValue) {
          onCryptoChange(newValue.id);
        }
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Cryptocurrency"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{ minWidth: 300 }}
    />
  );
}
