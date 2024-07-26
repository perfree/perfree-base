package com.perfree.commons.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class CustomByteArrayOutputStream extends ByteArrayOutputStream{
    public CustomByteArrayOutputStream() {
    }

    public CustomByteArrayOutputStream(int size) {
        super(size);
    }

    public ByteArrayInputStream getInputStream() {
        return new ByteArrayInputStream(this.buf, 0, this.count);
    }
}
